# Fast Step-by-Step Setup Guide

## 1. Open project folder

```bash
cd nodejs-devops-ci-cd-project
```

## 2. Install packages

```bash
npm install
```

## 3. Test app locally

```bash
npm start
```

Open:

```text
http://localhost:3000
```

## 4. Test Docker

```bash
docker build -t nodejs-devops-app .
docker run -p 3000:3000 nodejs-devops-app
```

## 5. Push to GitHub

```bash
git init
git add .
git commit -m "Complete DevOps CI/CD project"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/nodejs-devops-ci-cd-project.git
git push -u origin main
```

## 6. Create ECR repository

AWS Console:

```text
ECR > Create repository > nodejs-devops-app
```

Copy your repository URI.

## 7. Replace ECR image in Kubernetes deployment

Open:

```text
k8s/deployment.yaml
```

Replace:

```text
YOUR_ECR_REGISTRY/nodejs-devops-app:latest
```

with:

```text
ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/nodejs-devops-app:latest
```

Push the change:

```bash
git add .
git commit -m "Add ECR image URI"
git push
```

## 8. Push first Docker image manually

```bash
aws configure
aws ecr get-login-password --region REGION | docker login --username AWS --password-stdin ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com
docker build -t nodejs-devops-app .
docker tag nodejs-devops-app:latest ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/nodejs-devops-app:latest
docker push ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/nodejs-devops-app:latest
```

## 9. Launch EC2

Use:

```text
Ubuntu 22.04
t2.micro
Security group:
22 SSH
30080 Custom TCP
```

## 10. Install tools on EC2

SSH into EC2:

```bash
ssh -i "your-key.pem" ubuntu@EC2_PUBLIC_IP
```

Run:

```bash
sudo apt update -y
sudo apt install docker.io unzip curl -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu
newgrp docker

curl -LO "https://dl.k8s.io/release/v1.30.0/bin/linux/amd64/kubectl"
chmod +x kubectl
sudo mv kubectl /usr/local/bin/

curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
chmod +x minikube-linux-amd64
sudo mv minikube-linux-amd64 /usr/local/bin/minikube

minikube start --driver=docker

curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
aws configure
```

## 11. Copy Kubernetes files to EC2

From laptop:

```bash
scp -i "your-key.pem" -r k8s ubuntu@EC2_PUBLIC_IP:/home/ubuntu/
```

On EC2:

```bash
cd /home/ubuntu/k8s
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl get pods
kubectl get services
```

## 12. Open app

```text
http://EC2_PUBLIC_IP:30080
```

## 13. Add GitHub Actions secrets

Add:

```text
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_REGION
ECR_REGISTRY
ECR_REPOSITORY
EC2_HOST
EC2_SSH_KEY
```

## 14. Test CI/CD

Change heading in server.js, then:

```bash
git add .
git commit -m "Test CI/CD update"
git push
```

Check GitHub Actions tab. When successful, refresh:

```text
http://EC2_PUBLIC_IP:30080
```
