import os

__all__ = []

# Loop to get names of models
for module in os.scandir(os.path.dirname(__file__)):
    if module.name != '__pycache__' and not module.is_file():
        __all__.append(module.name)
