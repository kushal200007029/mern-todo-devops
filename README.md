# MERN Todo DevOps Assignment

## Overview

This project demonstrates a production-style DevOps deployment workflow using Kubernetes, Docker, GitHub Actions CI/CD, and AWS EC2 infrastructure.

The application stack consists of:

* Node.js backend API
* MongoDB database
* Kubernetes deployments and services
* CI/CD pipeline using GitHub Actions
* Docker image management using Docker Hub

The focus of this assignment is infrastructure deployment, operational debugging, observability, and deployment automation.

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

* AWS EC2 (Ubuntu 22.04)
* Docker
* Kubernetes (Minikube)
* Node.js
* MongoDB
* GitHub Actions
* Docker Hub

---

# Application Components

## Backend

* Node.js + Express API
* Dockerized using multi-stage Docker build
* Kubernetes deployment with probes

## Database

* MongoDB running inside Kubernetes
* Internal communication through Kubernetes Service

---

# Kubernetes Features Implemented

## Readiness and Liveness Probes

Implemented health checks for backend reliability.

Benefits:

* Prevents traffic routing to unhealthy containers
* Automatically restarts failed containers

Tradeoff:

* Incorrect probe configuration can cause restart loops

---

## Kubernetes Secret Management

MongoDB connection URI is managed using Kubernetes Secrets instead of hardcoding values in deployment manifests.

Benefits:

* Better security
* Cleaner configuration management

Tradeoff:

* Additional operational management required for secret handling

---

# CI/CD Pipeline

GitHub Actions pipeline automatically:

1. Checks out source code
2. Builds Docker image
3. Pushes image to Docker Hub

Workflow location:
.github/workflows/deploy.yml

---

# Deployment Steps

## Start Minikube

```bash
minikube start --driver=docker
```

## Deploy MongoDB

```bash
kubectl apply -f mongodb-deployment.yaml
kubectl apply -f mongodb-service.yaml
```

## Deploy Backend

```bash
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml
```

---

# Verification Commands

## Check Nodes

```bash
kubectl get nodes
```

## Check Pods

```bash
kubectl get pods
```

## Check Services

```bash
kubectl get svc
```

## Backend Logs

```bash
kubectl logs deployment/backend
```

## API Test

```bash
curl http://192.168.49.2:30080/api/todos
```

---

# Failure Simulation and Debugging

## Simulated Failure

An incorrect MongoDB service hostname was intentionally configured:

```text
wrong-mongodb-service
```

This caused:

* backend pod instability
* readiness probe failures
* liveness probe failures

---

# Debugging Process

Commands used during debugging:

```bash
kubectl get pods
kubectl logs deployment/backend
kubectl describe pod <pod-name>
kubectl rollout status deployment/backend
```

Root cause identified:

* incorrect Kubernetes service DNS name
* incorrect probe path configuration initially

Fix applied:

* corrected MongoDB service name
* corrected readiness/liveness probe path

---

# Production Tradeoffs

This assignment intentionally uses:

* Minikube on AWS EC2
* single-node Kubernetes cluster
* single MongoDB replica
* no persistent storage

These decisions were made to reduce setup complexity and focus on deployment, debugging, and operational workflows within assignment time constraints.

In a production environment, improvements would include:

* Managed Kubernetes (EKS)
* Persistent Volumes
* High Availability setup
* Monitoring stack (Prometheus/Grafana)
* Ingress Controller
* Automated Kubernetes deployments

---

# Docker Hub Image

```text
kushaldevopsengg/todo-backend:v1
```

---

# Author

Kushal Kanhake
