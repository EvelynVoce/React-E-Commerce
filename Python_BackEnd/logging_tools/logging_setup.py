import logging


def setup_logger(name, log_file, level=logging.INFO):
    formatter = logging.Formatter('{"LogDateTime": "%(asctime)s","Level": "%(levelname)s", "message": %(message)s}', datefmt='%d-%m-%y %H:%M:%S')
    handler = logging.FileHandler(log_file)
    handler.setFormatter(formatter)
    logger = logging.getLogger(name)
    logger.setLevel(level)
    logger.addHandler(handler)
    return logger
