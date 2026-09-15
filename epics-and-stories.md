# Agile Project Planning: Tax Calculator Modernization & CI/CD

## 📌 Epic Overview

**Epic Title:** Modernize, Containerize, and Automate CI/CD for Tax Calculator Web Application  
**Epic ID:** EPIC-001  
**Owner:** imadpervezdurrani  
**Description:**  
Modernize the existing Tax Calculator service by transforming it into a cloud-native, containerized web application deployed on IBM Cloud with an automated Tekton CI/CD pipeline. The modernization includes implementing comprehensive automated unit testing (using Jasmine), containerization with Docker, deploying to IBM Cloud Container Registry & Kubernetes, and establishing continuous integration and continuous deployment pipelines using Tekton tasks.

**Business Value:**  
- Accelerate release frequency through automated CI/CD pipelines.
- Ensure high software quality and prevent regressions with Jasmine automated unit tests.
- Achieve consistent, environment-agnostic execution using lightweight Docker containers.
- Provide scalable, highly available cloud hosting with zero downtime rolling deployments on IBM Cloud.

---

## 📋 User Stories

### Story 1: Implement Automated Unit Testing with Jasmine
- **Story ID:** US-001
- **Title:** Implement Automated Unit Testing with Jasmine
- **As a:** Software Engineer
- **I want to:** Write and execute automated unit tests using the Jasmine framework
- **So that:** Tax calculations, standard deductions, and edge cases are verified automatically prior to build and deployment.
- **Story Points:** 3
- **Priority:** High
- **Labels:** `testing`, `jasmine`, `quality-assurance`, `unit-test`
- **Acceptance Criteria:**
  1. Jasmine test framework is configured in `spec/support/jasmine.json`.
  2. Test suite covers zero income, bracket boundaries, progressive multi-bracket tax, standard deductions, and error handling.
  3. `npm test` executes all specs and reports 100% success with zero failures.

---

### Story 2: Containerize Application using Docker
- **Story ID:** US-002
- **Title:** Containerize Application using Docker
- **As a:** DevOps Engineer
- **I want to:** Create a Dockerfile and container image for the Tax Calculator
- **So that:** The application runs consistently in local and cloud production environments.
- **Story Points:** 5
- **Priority:** High
- **Labels:** `docker`, `containerization`, `devops`
- **Acceptance Criteria:**
  1. A secure, multi-stage `Dockerfile` is created using `node:20-alpine`.
  2. `.dockerignore` excludes unnecessary files (`node_modules`, `.git`, logs).
  3. Application container builds cleanly with `docker build -t tax-calculator:latest .`.
  4. Container runs successfully locally on port 8080 and responds to HTTP requests.

---

### Story 3: Push Image to IBM Cloud Container Registry and Deploy
- **Story ID:** US-003
- **Title:** Publish to IBM Cloud Registry and Deploy to Kubernetes
- **As a:** Cloud Engineer
- **I want to:** Tag and push the Docker image to IBM Cloud Container Registry and deploy on IBM Cloud
- **So that:** The Tax Calculator is securely hosted and accessible to end users with high availability.
- **Story Points:** 5
- **Priority:** High
- **Labels:** `ibm-cloud`, `container-registry`, `kubernetes`, `deployment`
- **Acceptance Criteria:**
  1. Image is tagged with target registry: `icr.io/<namespace>/tax-calculator:latest`.
  2. Image is pushed to IBM Cloud Container Registry (`icr.io`).
  3. Kubernetes `deployment.yaml` and `service.yaml` configure 2 replicas and health checks (`/health`).
  4. Application pod rollout completes successfully and is reachable via NodePort or ingress.

---

### Story 4: Create Tekton Pipeline Tasks
- **Story ID:** US-004
- **Title:** Create Modular Tekton Tasks for CI/CD Workflow
- **As a:** DevOps Engineer
- **I want to:** Define reusable Tekton Tasks for unit testing, container image building, and cluster deployment
- **So that:** Each stage of the CI/CD pipeline is modular, reusable, and maintainable.
- **Story Points:** 5
- **Priority:** High
- **Labels:** `tekton`, `pipeline-tasks`, `ci-cd`
- **Acceptance Criteria:**
  1. `tekton/task-test.yaml` runs Jasmine tests in a Node.js container.
  2. `tekton/task-build.yaml` builds and pushes the image using Kaniko.
  3. `tekton/task-deploy.yaml` applies Kubernetes manifests and verifies rollout.
  4. All tasks accept required workspaces and parameters.

---

### Story 5: Orchestrate and Run Tekton Pipeline for Automated Deployment
- **Story ID:** US-005
- **Title:** Orchestrate Tekton Pipeline and Deploy via PipelineRun
- **As a:** Release Manager
- **I want to:** Assemble the tasks into a complete Tekton Pipeline and trigger execution
- **So that:** Any git commit triggers automated testing, image building, registry push, and cluster deployment end-to-end.
- **Story Points:** 8
- **Priority:** Critical
- **Labels:** `tekton`, `pipelinerun`, `automation`, `continuous-delivery`
- **Acceptance Criteria:**
  1. `tekton/pipeline.yaml` sequences `fetch-source` -> `run-unit-tests` -> `build-and-push-image` -> `deploy-to-cluster` using `runAfter`.
  2. `tekton/pipelinerun.yaml` instantiates the pipeline with persistent workspace storage and parameters.
  3. Pipeline run succeeds, all tasks pass, and the application is automatically deployed.
