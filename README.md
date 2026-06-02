# Node.js DevOps CI/CD Project

This project deploys a simple Node.js web application on AWS Free Tier using:

- Node.js and Express
- Docker
- Amazon ECR
- EC2 Ubuntu t2.micro
- Minikube Kubernetes
- GitHub Actions CI/CD

The application displays:

- Current timestamp
- Container ID / hostname
- Visitor counter
- Health endpoint

## Local Run

```bash
npm install
npm start
```

Open:

```text
http://localhost:3000
```

Health endpoint:

```text
http://localhost:3000/health
```

## Docker Run

```bash
docker build -t nodejs-devops-app .
docker run -p 3000:3000 nodejs-devops-app
```

Open:

```text
http://localhost:3000
```

## Important Replacement

Before Kubernetes deployment, edit:

```text
k8s/deployment.yaml
```

Replace:

```text
YOUR_ECR_REGISTRY/nodejs-devops-app:latest
```

with your real ECR image URI.

Example:

```text
123456789012.dkr.ecr.us-east-1.amazonaws.com/nodejs-devops-app:latest
```

## GitHub Secrets Required

Add these secrets in:

```text
GitHub Repo > Settings > Secrets and variables > Actions
```

| Secret Name | Meaning |
|---|---|
| AWS_ACCESS_KEY_ID | AWS access key |
| AWS_SECRET_ACCESS_KEY | AWS secret key |
| AWS_REGION | AWS region, example us-east-1 |
| ECR_REGISTRY | Example 123456789012.dkr.ecr.us-east-1.amazonaws.com |
| ECR_REPOSITORY | nodejs-devops-app |
| EC2_HOST | EC2 public IP |
| EC2_SSH_KEY | Full private .pem key content |

## Public URL Format

After deployment, open:

```text
http://EC2_PUBLIC_IP:30080
```

## Useful Kubernetes Commands

```bash
kubectl get nodes
kubectl get pods
kubectl get services
kubectl logs deployment/nodejs-devops-app
kubectl rollout restart deployment/nodejs-devops-app
kubectl scale deployment nodejs-devops-app --replicas=2
```
