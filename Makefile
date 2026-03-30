.PHONY: help install test clean upload docs

help:
	@echo "Available commands:"
	@echo "  install     - Install the package"
	@echo "  test        - Run tests"
	@echo "  clean       - Clean build artifacts"
	@echo "  upload      - Upload to PyPI"
	@echo "  docs        - Generate documentation"

install:
	pip install -r requirements.txt
	pip install -e .

test:
	python -m pytest tests/
	python example.py

clean:
	rm -rf build/
	rm -rf dist/
	rm -rf *.egg-info/
	find . -type d -name __pycache__ -exec rm -rf {} +
	find . -name "*.pyc" -delete

upload: clean
	python setup.py sdist bdist_wheel
	twine upload dist/*

docs:
	@echo "Documentation generation not implemented yet"
	@echo "Consider using Sphinx or MkDocs"

dev-install:
	pip install -r requirements.txt
	pip install -e .[dev]