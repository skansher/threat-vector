# M.I.N.I.O.N Deployment Guide

## Current Deployment

**Live URL:** http://minion-alb-1338239729.us-east-1.elb.amazonaws.com

### Infrastructure

- **Platform:** AWS ECS Fargate
- **Container Registry:** Amazon ECR
- **Load Balancer:** Application Load Balancer
- **Region:** us-east-1
- **Resources:** 512 CPU / 1GB RAM

### Architecture

```
Internet → ALB (Port 80) → ECS Fargate Task (Port 8080) → Node.js App
                                                          ├── React Frontend (build/)
                                                          └── Express API (/api/*)
```

## Deployment Process

### Prerequisites
- AWS CLI configured
- Docker (for local testing)
- Node.js 18+

### Build and Deploy

1. **Build the Docker image locally (optional):**
   ```bash
   docker build -t minion-app .
   docker run -p 8080:8080 minion-app
   ```

2. **Deploy to AWS:**
   
   a. Build and push to ECR:
   ```bash
   # Login to ECR
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 001467465983.dkr.ecr.us-east-1.amazonaws.com
   
   # Build and tag
   docker build -t minion-app .
   docker tag minion-app:latest 001467465983.dkr.ecr.us-east-1.amazonaws.com/minion-app:latest
   
   # Push
   docker push 001467465983.dkr.ecr.us-east-1.amazonaws.com/minion-app:latest
   ```
   
   b. Update ECS service:
   ```bash
   aws ecs update-service --cluster minion-cluster --service minion-service --force-new-deployment
   ```

### Using CodeBuild (No Docker Required)

1. **Update source code and create zip:**
   ```bash
   zip -r minion-app-source.zip . -x "node_modules/*" ".git/*"
   ```

2. **Upload to S3:**
   ```bash
   aws s3 cp minion-app-source.zip s3://minion-app-build-source-1762815486/
   ```

3. **Trigger build:**
   ```bash
   aws codebuild start-build --project-name minion-app-build
   ```

4. **Monitor build:**
   ```bash
   aws codebuild batch-get-builds --ids <build-id>
   ```

## Monitoring

### View Logs
```bash
aws logs tail /ecs/minion-app --follow
```

### Check Service Status
```bash
aws ecs describe-services --cluster minion-cluster --services minion-service
```

### Check Task Health
```bash
aws ecs list-tasks --cluster minion-cluster --service-name minion-service
aws ecs describe-tasks --cluster minion-cluster --tasks <task-arn>
```

### Check Load Balancer Health
```bash
aws elbv2 describe-target-health --target-group-arn arn:aws:elasticloadbalancing:us-east-1:001467465983:targetgroup/minion-tg/c2382150bb91c1b0
```

## Scaling

### Increase Task Count
```bash
aws ecs update-service --cluster minion-cluster --service minion-service --desired-count 2
```

### Update Resources
Edit `task-definition.json` and update CPU/memory, then:
```bash
aws ecs register-task-definition --cli-input-json file://task-definition.json
aws ecs update-service --cluster minion-cluster --service minion-service --task-definition minion-app-task:<new-version>
```

## Troubleshooting

### Container Won't Start
- Check logs: `aws logs tail /ecs/minion-app --follow`
- Verify image exists in ECR
- Check task definition CPU/memory limits

### Load Balancer Returns 503
- Check target health
- Verify security group allows port 8080 from ALB
- Ensure health check path `/api/apt-profiles` returns 200

### Slow Response Times
- Increase CPU/memory in task definition
- Check CloudWatch metrics for CPU/memory usage
- Verify security group rules allow traffic

## Resources

- **ECS Cluster:** minion-cluster
- **ECS Service:** minion-service
- **Task Definition:** minion-app-task
- **ECR Repository:** minion-app
- **Load Balancer:** minion-alb
- **Target Group:** minion-tg
- **Security Group:** sg-09fdbc5c5687c6ef5
- **VPC:** vpc-0fc4860c0968f1c92
- **Subnets:** subnet-0ff5a63e80b025b2b, subnet-08ee42b4f8f9e9d90, subnet-07c99f5f2a06fa22b
