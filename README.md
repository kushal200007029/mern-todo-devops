# MERN Todo DevOps Assignment

## Overview

This project demonstrates a production-style DevOps workflow using Kubernetes, Docker, GitHub Actions CI/CD, and AWS EC2 infrastructure.

The application stack includes:

* Node.js backend API
* MongoDB database
* Kubernetes deployments and services
* CI/CD automation using GitHub Actions
* Docker image management using Docker Hub

The focus of this assignment is:

* containerization
* deployment automation
* infrastructure debugging
* Kubernetes operations
* reliability improvements

---

# Architecture

GitHub Repository
↓
GitHub Actions CI/CD
↓
Docker Hub Image Registry
↓
AWS EC2 Instance
↓
Minikube Kubernetes Cluster
├── Backend Deployment
├── MongoDB Deployment
└── Kubernetes Services

---

# Technologies Used

* AWS EC2 (Ubuntu)
* Docker
* Kubernetes (Minikube)
* Node.js
* MongoDB
* GitHub Actions
* Docker Hub

---

# Application Components

## Backend Service

* Node.js + Express API
* Dockerized using multi-stage Docker build
* Deployed using Kubernetes Deployment

## Database

* MongoDB running inside Kubernetes
* Internal service discovery using Kubernetes Service

---

# Kubernetes Features Implemented

## Readiness & Liveness Probes

Implemented Kubernetes health checks for backend reliability.

### Why I Chose It

To ensure Kubernetes can:

* detect unhealthy containers
* avoid routing traffic to broken pods
* automatically restart failed containers

### Problem It Solves

Improves application reliability and availability during failures.

### Tradeoff

Incorrect probe configuration can create:

* restart loops
* false unhealthy states
* debugging complexity

---

## Kubernetes Secret Management

MongoDB connection URI is managed using Kubernetes Secrets instead of hardcoding environment variables in deployment manifests.

### Why I Chose It

To improve security and separate sensitive configuration from application manifests.

### Problem It Solves

Prevents sensitive database configuration from being exposed directly in YAML files.

### Tradeoff

Adds operational overhead because secrets must be managed separately.

---

# CI/CD Pipeline

GitHub Actions pipeline automatically:

1. Builds Docker image
2. Pushes image to Docker Hub
3. Connects to EC2 through SSH
4. Restarts Kubernetes deployment automatically

Workflow location:

```text id="r1"
.github/workflows/deploy.yml
```

---

# Deployment Workflow

Developer Pushes Code
↓
GitHub Actions Triggered
↓
Docker Image Build
↓
Docker Image Push to Docker Hub
↓
SSH Into EC2
↓
Kubernetes Deployment Restart
↓
Updated Pod Deployment

---

# Docker Image

```text id="r2"
kushaldevopsengg/todo-backend:latest
```

---

# Kubernetes Resources

## Deployments

```bash id="r3"
kubectl get deployments
```

## Pods

```bash id="r4"
kubectl get pods
```

## Services

```bash id="r5"
kubectl get svc
```

## Secrets

```bash id="r6"
kubectl get secrets
```

---

# Deployment Commands

## Start Minikube

```bash id="r7"
minikube start --driver=docker
```

---

## Deploy MongoDB

```bash id="r8"
kubectl apply -f mongodb-deployment.yaml
kubectl apply -f mongodb-service.yaml
```

---

## Deploy Backend

```bash id="r9"
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml
```

---

# Application Verification

## Verify Cluster

```bash id="r10"
kubectl get nodes
```

---

## Verify Pods

```bash id="r11"
kubectl get pods
```

---

## Verify Services

```bash id="r12"
kubectl get svc
```

---

## Backend Logs

```bash id="r13"
kubectl logs deployment/backend
```

---

## API Test

```bash id="r14"
curl http://192.168.49.2:30080/api/todos
```

---

# Intentional Failure Simulation & Debugging

## Failure Scenario

An incorrect MongoDB service hostname was intentionally configured:

```text id="r15"
wrong-mongodb-service
```

instead of:

```text id="r16"
mongodb-service
```

This caused:

* backend pod instability
* readiness probe failures
* liveness probe failures
* container restarts

---

# Debugging Process

Commands used during debugging:

```bash id="r17"
kubectl get pods
kubectl logs deployment/backend
kubectl describe pod <pod-name>
kubectl rollout status deployment/backend
```

---

# Root Cause Identified

1. Incorrect MongoDB service DNS name
2. Incorrect readiness/liveness probe path configuration initially

Observed error:

```text id="r18"
getaddrinfo EAI_AGAIN wrong-mongodb-service
```

---

# Fix Applied

1. Corrected MongoDB service name
2. Fixed readiness/liveness probe path
3. Reapplied Kubernetes deployment
4. Verified successful rollout

---

# Production Tradeoffs

This project intentionally uses:

* Minikube on AWS EC2
* single-node Kubernetes cluster
* single MongoDB replica
* no persistent storage

These decisions were made to:

* reduce setup complexity
* focus on debugging and deployment workflows
* complete the assignment within time constraints

---

# Production Improvements

In a real production environment, improvements would include:

* Amazon EKS
* Persistent Volumes
* High Availability MongoDB
* Monitoring Stack (Prometheus/Grafana)
* Ingress Controller
* TLS/HTTPS
* Horizontal Pod Autoscaling
* GitOps deployment strategy

---

# Repository Structure

```text id="r19"
mern-todo-devops/
├── backend/
├── frontend/
├── k8s/
├── .github/workflows/
└── README.md
```

---

# Author

Kushal Kanhake
