# Tax Calculator Web Application

[![CI/CD](https://img.shields.io/badge/CI%2FCD-Tekton%20Pipelines-blue.svg)](https://github.com/imadpervezdurrani/Tax-Calculator-app)
[![Tests](https://img.shields.io/badge/Unit%20Tests-Jasmine-green.svg)](https://github.com/imadpervezdurrani/Tax-Calculator-app)
[![Cloud](https://img.shields.io/badge/Cloud-IBM%20Cloud-1261FE.svg)](https://cloud.ibm.com)
[![Docker](https://img.shields.io/badge/Container-Docker-2496ED.svg)](https://www.docker.com)

A cloud-native Tax Calculator web application built for the **IBM DevOps Final Project**, featuring progressive tax bracket calculations, automated Jasmine unit tests, Docker containerization, and Tekton CI/CD pipeline automation.

---

## 🚀 Key Features
- **Progressive Tax Calculation Engine:** Accurately computes federal tax across all 7 progressive brackets (10%, 12%, 22%, 24%, 32%, 35%, 37%).
- **Deductions Support:** Dynamically applies standard deductions (Single, Married Filing Jointly, Head of Household) and custom itemized deductions.
- **Modern Responsive UI:** Glassmorphism dashboard with real-time tax calculation, visual breakdown bar, effective rate calculations, and monthly estimates.
- **Automated Jasmine Tests:** Comprehensive test suite with 100% pass rate covering edge cases, bracket thresholds, and error handling.
- **Dockerized:** Production-ready `Dockerfile` with non-root execution and lightweight Alpine base.
- **Tekton CI/CD Pipeline:** Fully orchestrated Kubernetes-native pipeline (`task-test` -> `task-build` -> `task-deploy`).

---

## 📁 Repository Structure
```
Tax-Calculator-app/
├── server.js                     # Express REST API & static file server (port 8080)
├── taxCalculator.js              # Business logic & tax calculation engine
├── public/                       # Responsive web client
│   ├── index.html                # HTML5 interface with semantic markup
│   ├── style.css                 # Glassmorphic responsive styling
│   └── app.js                    # Client controller & dynamic table renderer
├── spec/                         # Jasmine unit tests
│   ├── support/
│   │   └── jasmine.json          # Jasmine test runner configuration
│   └── taxCalculator.spec.js     # Comprehensive unit tests suite
├── Dockerfile                    # Containerization specification
├── .dockerignore                 # Container build exclusions
├── package.json                  # Dependencies & scripts
├── epics-and-stories.md          # Part A: Agile planning (Epic and 5 Stories)
├── deploy/                       # Kubernetes deployment manifests
│   ├── deployment.yaml           # 2-replica deployment with health probes
│   └── service.yaml              # NodePort/LoadBalancer service
├── tekton/                       # Part C: Tekton CI/CD Pipeline
│   ├── task-test.yaml            # Task 1: Jasmine unit tests
│   ├── task-build.yaml           # Task 2: Container image builder
│   ├── task-deploy.yaml          # Task 3: Kubernetes deployment task
│   ├── pipeline.yaml             # Pipeline orchestration linking all tasks
│   └── pipelinerun.yaml          # PipelineRun trigger manifest
├── SUBMISSION_GUIDE.md           # Exact copy-paste answers & screenshots guide
└── README.md                     # Project documentation
```

---

## 🛠️ Local Development & Testing

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Jasmine Unit Tests
```bash
npm test
```

### 3. Start Application Locally
```bash
npm start
```
Visit `http://localhost:8080` in your web browser.

---

## 🐳 Docker Commands

### Build Image
```bash
docker build -t tax-calculator:latest .
```

### Run Container
```bash
docker run -d -p 8080:8080 --name tax-calculator-app tax-calculator:latest
```
Access at `http://localhost:8080` and verify `/health` at `http://localhost:8080/health`.

---

## ☁️ IBM Cloud & Tekton CI/CD Pipeline

### Tag and Push to IBM Cloud Registry
```bash
ibmcloud cr login
docker tag tax-calculator:latest icr.io/<your-namespace>/tax-calculator:latest
docker push icr.io/<your-namespace>/tax-calculator:latest
```

### Apply Tekton Pipeline Tasks & Pipeline
```bash
kubectl apply -f tekton/task-test.yaml
kubectl apply -f tekton/task-build.yaml
kubectl apply -f tekton/task-deploy.yaml
kubectl apply -f tekton/pipeline.yaml
```

### Trigger Pipeline Execution
```bash
kubectl create -f tekton/pipelinerun.yaml
tkn pipelinerun logs -f --last
```

---

## 👤 Author
- **GitHub:** [@imadpervezdurrani](https://github.com/imadpervezdurrani)
- **Repository:** [https://github.com/imadpervezdurrani/Tax-Calculator-app](https://github.com/imadpervezdurrani/Tax-Calculator-app)
