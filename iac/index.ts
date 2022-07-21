#!/usr/bin/env node
import * as cdk from '@aws-cdk/core'

import { getConfig } from './config'
import { ServiceStack } from './service-stack'

const app = new cdk.App()

const config = getConfig()
const stackName = process.env.STACK_NAME || config.serviceName

const serviceStack = new ServiceStack(app, stackName, {
  stackName,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION || 'eu-central-1'
  }
})

serviceStack.tags.setTag('heritage', 'cdk')