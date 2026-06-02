const express = require("express");
const os = require("os");

const app = express();
const PORT = process.env.PORT || 3000;

let visitorCount = 0;

app.get("/", (req, res) => {
  visitorCount++;

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>DevOps CI/CD Project</title>
      <style>
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          min-height: 100vh;
          font-family: Arial, sans-serif;
          background: linear-gradient(135deg, #0f172a, #1e3a8a, #0369a1);
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 30px;
        }

        .card {
          width: 100%;
          max-width: 760px;
          background: rgba(15, 23, 42, 0.92);
          padding: 40px;
          border-radius: 22px;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.38);
          border: 1px solid rgba(255, 255, 255, 0.12);
          text-align: center;
        }

        .badge {
          display: inline-block;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(34, 197, 94, 0.18);
          color: #86efac;
          font-size: 14px;
          margin-bottom: 18px;
          border: 1px solid rgba(34, 197, 94, 0.35);
        }

        h1 {
          color: #38bdf8;
          margin: 0 0 12px;
          font-size: 32px;
        }

        .subtitle {
          color: #cbd5e1;
          margin-bottom: 28px;
          font-size: 16px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
          gap: 16px;
          margin-top: 25px;
          text-align: left;
        }

        .item {
          background: rgba(30, 41, 59, 0.9);
          padding: 18px;
          border-radius: 14px;
          border: 1px solid rgba(148, 163, 184, 0.2);
        }

        .label {
          color: #94a3b8;
          font-size: 13px;
          margin-bottom: 8px;
        }

        .value {
          color: #f8fafc;
          font-size: 17px;
          overflow-wrap: break-word;
        }

        .footer {
          margin-top: 28px;
          color: #a7f3d0;
          font-weight: bold;
        }

        code {
          color: #fde68a;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="badge">Live DevOps Deployment</div>
        <h1>Node.js App with Docker, Kubernetes & CI/CD</h1>
        <p class="subtitle">
          Deployed using Docker, Amazon ECR, EC2, Minikube Kubernetes and GitHub Actions.
        </p>

        <div class="grid">
          <div class="item">
            <div class="label">Current Timestamp</div>
            <div class="value">${new Date().toLocaleString()}</div>
          </div>

          <div class="item">
            <div class="label">Container ID / Hostname</div>
            <div class="value"><code>${os.hostname()}</code></div>
          </div>

          <div class="item">
            <div class="label">Visitor Counter</div>
            <div class="value">${visitorCount}</div>
          </div>

          <div class="item">
            <div class="label">Application Port</div>
            <div class="value">${PORT}</div>
          </div>
        </div>

        <div class="footer">Application is running successfully.</div>
      </div>
    </body>
    </html>
  `);
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Application is healthy",
    timestamp: new Date().toISOString(),
    container: os.hostname(),
    uptime: process.uptime()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
