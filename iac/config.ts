import { Construct } from "@aws-cdk/core";

const serviceName = "epilot360-unicorn-game";
const projectName = "epilot360-unicorn-game";

const config = {
  dev: {
    serviceName: `${serviceName}-dev`,
    projectName,
    importBucket: "epilot360-portal-dev-Bucket",
    importDistributionDomainName: "epilot360-portal-dev-DistributionDomainName",
    importDistributionId: "epilot360-portal-dev-DistributionId",
  },
  staging: {
    serviceName: `${serviceName}-staging`,
    projectName,
    importBucket: "epilot360-portal-staging-Bucket",
    importDistributionDomainName:
      "epilot360-portal-staging-DistributionDomainName",
    importDistributionId: "epilot360-portal-staging-DistributionId",
  },
  prod: {
    serviceName: `${serviceName}-prod`,
    projectName,
    importBucket: "epilot360-portal-prod-Bucket",
    importDistributionDomainName:
      "epilot360-portal-prod-DistributionDomainName",
    importDistributionId: "epilot360-portal-prod-DistributionId",
  },
};

export type Stage = keyof typeof config;

export const getStage = (): Stage => {
  const stageEnv = process.env.STAGE as Stage;

  if (Object.getOwnPropertyNames(config).includes(stageEnv)) {
    return stageEnv;
  }

  return "dev";
};

export const getConfig = (scope?: Construct) => {
  const stage = getStage();

  return {
    serviceName:
      scope?.node.tryGetContext("serviceName") ?? config[stage].serviceName,
    projectName:
      scope?.node.tryGetContext("projectName") ?? config[stage].projectName,
    importBucket:
      scope?.node.tryGetContext("importBucket") ?? config[stage].importBucket,
    importDistributionDomainName:
      scope?.node.tryGetContext("importDistributionDomainName") ??
      config[stage].importDistributionDomainName,
    importDistributionId:
      scope?.node.tryGetContext("importDistributionId") ??
      config[stage].importDistributionId,
  };
};
