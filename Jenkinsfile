def region = "eu-west-1"
def stackName = getRepoName() + "-" + getGitBranchName()

pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY_ID = credentials("jenkins-aws-secret-key-id")
        AWS_SECRET_ACCESS_KEY = credentials("jenkins-aws-secret-access-key")
        DEPLOY_BUCKET = credentials("deploy-bucket")
    }

    stages {
        stage("Install") {
            steps {
                sh "npm install"
            }
        }
        stage("Build") {
            steps {
                sh "npm run build"
            }
        }
        stage("Test") {
            steps {
               sh "npm run test"
            }
        }
        stage("Deploy") {
            steps {
                sh "aws configure set region ${region}"
                sh "sam package \
                        --template-file template.yaml \
                        --output-template-file packaged.yaml \
                        --s3-bucket ruidpm-deploys \
                        --s3-prefix ${stackName}"
                sh "sam deploy \
                        --template-file packaged.yaml \
                        --stack-name ${stackName} \
                        --capabilities CAPABILITY_IAM \
                        --no-fail-on-empty-changeset"
            }
        }
    }
}

def getRepoName() {
    scm.getUserRemoteConfigs()[0].getUrl().tokenize('/')[3].split("\\.")[0]
}

def getGitBranchName() {
    scm.branches[0].name
}