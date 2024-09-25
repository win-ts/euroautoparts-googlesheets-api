pipeline {
    agent any

    environment {
        REGISTRY = "192.168.1.108:5000"
        IMAGE_NAME = "euroautoparts-googlesheets-api"
        KUBE_NAMESPACE = "prod"
        KUBE_CONFIG = credentials('kubeconfig')
        GIT_REPO_URL = 
        GIT_CREDENTIALS_ID = 'github-credentials-id'
        MANIFEST_DIR = "k8s"
    }

    stages {
        stage('Checkout GitHub') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/migrate-on-prem']],
                    userRemoteConfigs: [[
                        url: env.GIT_REPO_URL,
                        credentialsId: env.GIT_CREDENTIALS_ID
                    ]]
                ])
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${env.REGISTRY}/${env.IMAGE_NAME}:latest")
                }
            }
        }

        stage('Push to Registry') {
            steps {
                script {
                    docker.withRegistry("http://${env.REGISTRY}", '') {
                        dockerImage.push("latest")
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh """
                    export KUBECONFIG=\$(cat ${env.KUBE_CONFIG})
                    kubectl apply -f ${env.MANIFEST_DIR} -n ${env.KUBE_NAMESPACE}
                    """
                }
            }
        }
    }
}
