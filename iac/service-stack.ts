import * as s3 from '@aws-cdk/aws-s3'
import * as s3deploy from '@aws-cdk/aws-s3-deployment'
import * as cdk from '@aws-cdk/core'

import { getConfig } from './config'

export class ServiceStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const config = getConfig(this)

    // Content bucket
    const siteBucket = s3.Bucket.fromBucketName(
      this,
      'SiteBucket',
      cdk.Fn.importValue(config.importBucket)
    )

    // Deploy site contents in S3 bucket
    const _mfe = new s3deploy.BucketDeployment(this, 'DeployMFE', {
      sources: [s3deploy.Source.asset('../dist')],
      destinationBucket: siteBucket,
      destinationKeyPrefix: `${config.projectName}/`,
      prune: false
    })

    // Deploy storybook in s3 bucket
    // const _storybook = new s3deploy.BucketDeployment(this, 'DeployStorybook', {
    //   sources: [s3deploy.Source.asset('../storybook-static')],
    //   destinationBucket: siteBucket,
    //   destinationKeyPrefix: `${config.projectName}/`,
    //   prune: false
    // })
  }
}
