from invoke import task
from dotenv import load_dotenv
import os
import json

load_dotenv("./.env.local")


@task(help={"tag": "Docker image tag"})
def docker_build(c, tag="3gpp-chatgpt"):
    """Build Docker image"""

    json_version = c.run("gitversion", hide="out").stdout.strip()
    version = json.loads(json_version)["SemVer"]
    print(f"Building Docker image {tag}:{version}")
    c.run(
        f'docker build --platform=linux/amd64 -t "{tag}":{version} '
        f"-f build/Dockerfile ."
    )


@task(help={"tag": "Docker image tag"})
def docker_run(c, tag="3gpp-chatgpt"):
    """Run Docker image"""
    json_version = c.run("gitversion", hide="out").stdout.strip()
    version = json.loads(json_version)["SemVer"]
    print(f"Running Docker image {tag}:{version}")
    c.run(
        f"docker run --rm -it --rm -p 3000:3000 "
        f'-e OPENAI_API_KEY={os.getenv("OPENAI_API_KEY")} '
        f'-e PINECONE_API_KEY={os.getenv("PINECONE_API_KEY")} '
        f'-e PINECONE_ENVIRONMENT={os.getenv("PINECONE_ENVIRONMENT")} '
        f'-e PINECONE_INDEX={os.getenv("PINECONE_INDEX")} '
        f'-e TEAMS_WEB_HOOK={os.getenv("TEAMS_WEB_HOOK")} '
        f"{tag}:{version} ",
        pty=True,
        echo=True,
    )


@task(help={"tag": "Docker image tag"})
def docker_push(c, tag="3gpp-chatgpt"):
    """Push Docker image to Azure Container Registry"""

    json_version = c.run("gitversion", hide="out").stdout.strip()
    version = json.loads(json_version)["SemVer"]
    print(f"Tagging Docker image with anonmldev.azurecr.io/{tag}:{version}")
    c.run(
        f"docker tag {tag}:{version} anonmldev.azurecr.io/{tag}:{version}",
        pty=True,
        echo=True,
    )

    print("Pushing Docker image...")
    c.run(
        f"docker push anonmldev.azurecr.io/{tag}:{version}",
        pty=True,
        echo=True,
    )


@task(help={"tag": "Docker image tag"})
def azure_deploy(c, tag="3gpp-chatgpt"):
    "Deploy Docker image in Azure Container Registry"

    json_version = c.run("gitversion", hide="out").stdout.strip()
    version = json.loads(json_version)["SemVer"]

    print(f"Deploying Docker image anonmldev.azurecr.io/{tag}:{version}")
    c.run(
        f"az containerapp up "
        f'--name "chatgpt3gpp" '
        f'--resource-group "ml-llm" '
        f'--location "centralindia" '
        f'--environment "managedEnvironment-mlllm-b332" '
        f'--image "anonmldev.azurecr.io/{tag}:{version}" '
        f"--target-port 3000 "
        f"--ingress external "
        f"--query properties.configuration.ingress.fqdn"
    )
