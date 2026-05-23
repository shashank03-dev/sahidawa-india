import importlib
import logging

from fastapi import FastAPI


logger = logging.getLogger(__name__)


def include_router_if_available(
    app: FastAPI,
    module_path: str,
    *,
    router_name: str = "router",
    required: bool = False,
) -> bool:
    try:
        module = importlib.import_module(module_path)
    except ModuleNotFoundError:
        if required:
            raise

        logger.warning("Skipping optional router %s because its dependencies are unavailable", module_path)
        return False

    app.include_router(getattr(module, router_name))
    return True
