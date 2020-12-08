from setuptools import setup, find_packages

with open("README.md", "r") as fh:
    long_description = fh.read()


setup(
    name="tinybakerweb",
    version="0.0.1",
    author="Evin Sellin",
    author_email="evinism@gmail.com",
    description="Web wrapper for TinyBaker jobs",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/evinism/tinybakerweb",
    packages=find_packages(),
    install_requires=["tinybaker", "flask"],
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.6"
)