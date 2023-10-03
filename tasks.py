from invoke import task
from dotenv import load_dotenv
import os

load_dotenv("./.env.local")


@task(help={"tag": "Docker image tag"})
def docker_build(c, tag="3gpp-chatgpt"):
    """Build Docker image"""
    print("Building Docker image...")
    c.run(f'docker build --platform=linux/amd64 -t "{tag}" ' f"-f build/Dockerfile .")


@task(help={"tag": "Docker image tag"})
def docker_run(c, tag="3gpp-chatgpt"):
    """Run Docker image"""
    print("Running Docker image...")
    c.run(
        f"docker run --rm -it --rm -p 3000:3000 "
        f'-e OPENAI_API_KEY={os.getenv("OPENAI_API_KEY")} '
        f'-e PINECONE_API_KEY={os.getenv("PINECONE_API_KEY")} '
        f'-e PINECONE_ENVIRONMENT={os.getenv("PINECONE_ENVIRONMENT")} '
        f'-e PINECONE_INDEX={os.getenv("PINECONE_INDEX")} '
        f"{tag} ",
        pty=True,
        echo=True,
    )


@task(help={"tag": "Docker image tag"})
def docker_push(c, tag="3gpp-chatgpt"):
    """Push Docker image to Azure Container Registry"""

    print(f"Tagging Docker image with anonmldev.azurecr.io/{tag}")
    c.run(f"docker tag 3gpp-chatgpt anonmldev.azurecr.io/{tag}", pty=True, echo=True)

    print("Pushing Docker image...")
    c.run(
        f"docker push anonmldev.azurecr.io/{tag}",
        pty=True,
        echo=True,
    )
