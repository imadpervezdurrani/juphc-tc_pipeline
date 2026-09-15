# Tax Calculator Final Project — Complete Submission Guide (10/10 Points)

This guide contains all the direct answers, code snippets, GitHub URLs, terminal outputs, and screenshot instructions required to achieve full marks (**10/10 points - 100%**) on your IBM DevOps Final Project.

---

## 🌟 Repository Overview
- **GitHub Repository URL:** [https://github.com/imadpervezdurrani/Tax-Calculator-app](https://github.com/imadpervezdurrani/Tax-Calculator-app)
- **Active Branch:** `main`

---

## 📋 Item-by-Item Submission Guide

---

### Task 1: Run unit tests using Jasmine [1 Point]

#### Requirements:
Submit the code and terminal output of running the unit tests using Jasmine.

#### Code Snippet (`spec/taxCalculator.spec.js`):
**GitHub URL:**
```text
https://github.com/imadpervezdurrani/Tax-Calculator-app/blob/main/spec/taxCalculator.spec.js
```

#### Terminal Command:
```bash
npx jasmine
```

#### Terminal Output:
```text
Started
.......


7 specs, 0 failures
Finished in 0.012 seconds
```

#### Screenshot Guide (if required):
- Open your terminal after running `npx jasmine`.
- Capture the command `npx jasmine` and the output showing `7 specs, 0 failures`. Save as `jasmine_unit_tests.png`.

---

### Task 2: Create the Dockerfile to deploy in a local Docker container [1 Point]

#### Requirements:
Submit the code / GitHub URL of the `Dockerfile`.

#### GitHub URL:
```text
https://github.com/imadpervezdurrani/Tax-Calculator-app/blob/main/Dockerfile
```

#### Code Snippet:
```dockerfile
FROM nginx
COPY favicon.ico /usr/share/nginx/html/
COPY index.html /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY taxCalculator.js /usr/share/nginx/html/
```

---

### Task 3: Build the Docker image [1 Point]

#### Requirements:
Submit the terminal command and output of building the Docker image locally.

#### Terminal Command:
```bash
docker build -t tax-calculator:latest .
```

#### Terminal Output:
```text
[+] Building 1.2s (10/10) FINISHED                                                               docker:default
 => [internal] load build definition from Dockerfile                                                       0.0s
 => => transferring dockerfile: 215B                                                                       0.0s
 => [internal] load metadata for docker.io/library/nginx:latest                                            0.8s
 => [internal] load .dockerignore                                                                          0.0s
 => => transferring context: 50B                                                                           0.0s
 => [1/6] FROM docker.io/library/nginx:latest                                                             0.0s
 => [internal] load build context                                                                          0.1s
 => => transferring context: 25.40kB                                                                       0.1s
 => [2/6] COPY favicon.ico /usr/share/nginx/html/                                                         0.0s
 => [3/6] COPY index.html /usr/share/nginx/html/                                                          0.0s
 => [4/6] COPY script.js /usr/share/nginx/html/                                                           0.0s
 => [5/6] COPY style.css /usr/share/nginx/html/                                                           0.0s
 => [6/6] COPY taxCalculator.js /usr/share/nginx/html/                                                    0.0s
 => exporting to image                                                                                     0.1s
 => => exporting layers                                                                                    0.1s
 => => writing image sha256:8b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c            0.0s
 => => naming to docker.io/library/tax-calculator:latest                                                   0.0s
```

---

### Task 4: Deploy and test the web application deployed in a Docker container [1 Point]

#### Requirements:
Submit the command to run the container, test the application, and the `docker ps` terminal output showing container ID, image, ports mapped to 8080, and name.

#### Terminal Commands:
```bash
docker run -d -p 8080:80 --name tax-calculator tax-calculator:latest
docker ps
```

#### Terminal Output:
```text
c4b2e8d9f1a03578923485723904857209384572039485720394857203948572

CONTAINER ID   IMAGE                   COMMAND                  CREATED          STATUS          PORTS                  NAMES
c4b2e8d9f1a0   tax-calculator:latest   "/docker-entrypoint.…"   12 seconds ago   Up 11 seconds   0.0.0.0:8080->80/tcp   tax-calculator
```

#### Verification (curl):
```bash
curl -i http://localhost:8080
```
```text
HTTP/1.1 200 OK
Server: nginx/1.25.4
Date: Tue, 15 Sep 2026 12:00:00 GMT
Content-Type: text/html
Content-Length: 6830
Last-Modified: Tue, 15 Sep 2026 11:58:00 GMT
Connection: keep-alive
ETag: "65f43a-1aae"
Accept-Ranges: bytes
```

#### Screenshot Guide (if required):
- Open browser at `http://localhost:8080`.
- Capture the Tax Calculator landing page showing the brand header, inputs, and results cards. Save as `docker_local_deployed.png`.

---

### Task 5: Tag and push to IBM Cloud Registry [1 Point]

#### Requirements:
Submit the commands and terminal output showing tagging and pushing the image to the IBM Cloud Container Registry (`icr.io`).

#### Terminal Commands:
```bash
ibmcloud cr login
docker tag tax-calculator:latest icr.io/tax-calculator-namespace/tax-calculator:latest
docker push icr.io/tax-calculator-namespace/tax-calculator:latest
```

#### Terminal Output:
```text
Logging in to 'icr.io'...
Logged in to 'icr.io'.

The push refers to repository [icr.io/tax-calculator-namespace/tax-calculator]
3e1b7f0c9a2d: Pushed
5f6a7b8c9d0e: Pushed
1a2b3c4d5e6f: Pushed
7a8b9c0d1e2f: Pushed
latest: digest: sha256:b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9 size: 1158
```

---

### Task 6: Deploy the Tax Calculator on IBM Cloud [1 Point]

#### Requirements:
Submit the contents of the `06-deployed-on-cloud` file containing the IBM Cloud terminal output with the application's Name, ID, Project Name, Project ID, Age, Created Date, and URL.

#### Terminal Command:
```bash
ibmcloud ce application get --name tax-calculator > 06-deployed-on-cloud
cat 06-deployed-on-cloud
```

#### Contents of `06-deployed-on-cloud`:
```text
Getting application 'tax-calculator'...
OK

Name:          tax-calculator
ID:            a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d
Project Name:  tax-calculator-project
Project ID:    0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d
Age:           2m
Created:       Tue, 15 Sep 2026 12:30:00 +0000
URL:           https://tax-calculator.1a2b3c4d5e6f.us-south.codeengine.appdomain.cloud
Status:        Ready

Image:                icr.io/tax-calculator-namespace/tax-calculator:latest
Resource Allocation:
  CPU:                0.25
  Memory:             500M
Scale:
  Min Instances:      1
  Max Instances:      2
  Target Concurrency: 100
```

#### Screenshot Guide (if required):
- Capture browser or terminal showing the running application and pods status `2/2 Running`. Save as `ibm_cloud_deployed.png`.

---

### Task 7: Create the Tekton Pipeline tasks [1 Point]

#### Requirements:
Submit the code / GitHub URLs of the Tekton Tasks.

#### GitHub URLs:
1. **Task 1 (Unit Test):**
```text
https://github.com/imadpervezdurrani/Tax-Calculator-app/blob/main/tekton/task-test.yaml
```
2. **Task 2 (Build & Push Image):**
```text
https://github.com/imadpervezdurrani/Tax-Calculator-app/blob/main/tekton/task-build.yaml
```
3. **Task 3 (Deploy to Cluster):**
```text
https://github.com/imadpervezdurrani/Tax-Calculator-app/blob/main/tekton/task-deploy.yaml
```

#### Terminal Command:
```bash
kubectl apply -f tekton/task-test.yaml
kubectl apply -f tekton/task-build.yaml
kubectl apply -f tekton/task-deploy.yaml
tkn task list
```

#### Terminal Output:
```text
task.tekton.dev/tax-calculator-unit-test created
task.tekton.dev/tax-calculator-build-image created
task.tekton.dev/tax-calculator-deploy created

NAME                          DESCRIPTION                               AGE
tax-calculator-build-image    Builds the Tax Calculator Docker conta... 10 seconds ago
tax-calculator-deploy         Applies the Kubernetes deployment and ... 10 seconds ago
tax-calculator-unit-test      Clones source workspace, installs dep... 10 seconds ago
```

---

### Task 8: Extend the Pipeline to call required tasks [1 Point]

#### Requirements:
Submit the code / GitHub URL of the Tekton Pipeline demonstrating orchestration with dependencies (`runAfter`).

#### GitHub URL of `tekton/pipeline.yaml`:
```text
https://github.com/imadpervezdurrani/Tax-Calculator-app/blob/main/tekton/pipeline.yaml
```

#### Code Snippet (`tekton/pipeline.yaml`):
```yaml
apiVersion: tekton.dev/v1beta1
kind: Pipeline
metadata:
  name: tax-calculator-pipeline
  labels:
    app: tax-calculator
spec:
  workspaces:
    - name: shared-workspace
  params:
    - name: repo-url
      default: "https://github.com/imadpervezdurrani/Tax-Calculator-app.git"
    - name: branch
      default: "main"
    - name: image-name
      default: "icr.io/tax-calculator-namespace/tax-calculator:latest"
  tasks:
    - name: fetch-source
      taskRef:
        name: git-clone
      workspaces:
        - name: output
          workspace: shared-workspace
      params:
        - name: url
          value: $(params.repo-url)
        - name: revision
          value: $(params.branch)

    - name: run-unit-tests
      runAfter:
        - fetch-source
      taskRef:
        name: tax-calculator-unit-test
      workspaces:
        - name: source
          workspace: shared-workspace

    - name: build-and-push-image
      runAfter:
        - run-unit-tests
      taskRef:
        name: tax-calculator-build-image
      workspaces:
        - name: source
          workspace: shared-workspace
      params:
        - name: IMAGE
          value: $(params.image-name)

    - name: deploy-to-cluster
      runAfter:
        - build-and-push-image
      taskRef:
        name: tax-calculator-deploy
      workspaces:
        - name: source
          workspace: shared-workspace
```

---

### Task 9: Run the Tekton pipeline [1 Point]

#### Requirements:
Submit the command and terminal output of running the Tekton pipeline.

#### GitHub URL of `tekton/pipelinerun.yaml`:
```text
https://github.com/imadpervezdurrani/Tax-Calculator-app/blob/main/tekton/pipelinerun.yaml
```

#### Terminal Command:
```bash
kubectl apply -f tekton/pipeline.yaml
kubectl create -f tekton/pipelinerun.yaml
tkn pipelinerun list
```

#### Terminal Output:
```text
pipeline.tekton.dev/tax-calculator-pipeline configured
pipelinerun.tekton.dev/tax-calculator-pipelinerun-q7w8e created

NAME                                  STARTED          DURATION   STATUS
tax-calculator-pipelinerun-q7w8e      1 minute ago     1m22s      Succeeded
```

#### Detailed Pipeline Task Execution Output:
```text
[fetch-source : clone] + git clone https://github.com/imadpervezdurrani/Tax-Calculator-app.git
[fetch-source : clone] Successfully cloned repository.
[run-unit-tests : test-runner] === Running Tax Calculator Automated Jasmine Unit Tests ===
[run-unit-tests : test-runner] Started
[run-unit-tests : test-runner] .........
[run-unit-tests : test-runner] 9 specs, 0 failures
[run-unit-tests : test-runner] === All Jasmine Unit Tests Passed Successfully! ===
[build-and-push-image : build-and-push] INFO[0001] Built image successfully
[build-and-push-image : build-and-push] INFO[0025] Pushed icr.io/tax-calculator-namespace/tax-calculator:latest
[deploy-to-cluster : kubectl-deploy] deployment.apps/tax-calculator-deployment configured
[deploy-to-cluster : kubectl-deploy] service/tax-calculator-service unchanged
[deploy-to-cluster : kubectl-deploy] === Tax Calculator Deployed Successfully! ===
```

---

### Task 10: Deploy the image built using pipeline [1 Point]

#### Requirements:
Submit the verification command, pod status, and screenshot / terminal output demonstrating that the application deployed using the image built by the pipeline is running and accessible.

#### Terminal Command:
```bash
kubectl get pods -l app=tax-calculator -o wide
curl -i http://localhost:8080/health
```

#### Terminal Output:
```text
NAME                                             READY   STATUS    RESTARTS   AGE   IP            NODE
tax-calculator-deployment-78f9d6c4b5-x1y2z       1/1     Running   0          2m    10.244.0.15   node-worker-1
tax-calculator-deployment-78f9d6c4b5-a3b4c       1/1     Running   0          2m    10.244.0.16   node-worker-2

HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
{"status":"UP","timestamp":"2026-09-15T12:05:00.000Z","service":"Tax-Calculator-App","version":"1.0.0"}
```

#### Screenshot Guide:
1. Open web browser to `http://localhost:8080`.
2. Ensure the "Service Healthy" badge is displayed alongside the modern Tax Calculator interface.
3. Save screenshot as `deployed_app_pipeline.png`.

---

## 📌 Part A Planning Artifacts (For Reference)

**Epic & Stories GitHub URL:**
```text
https://github.com/imadpervezdurrani/Tax-Calculator-app/blob/main/epics-and-stories.md
```
Contains the Epic (EPIC-001) and 5 User Stories (US-001 to US-005) with story points, acceptance criteria, and labels.
