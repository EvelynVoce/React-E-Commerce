import logging


def setup_logger(name, log_file, format='{"LogDateTime": "%(asctime)s","Level": "%(levelname)s", "Message": %(message)s}',  level=logging.INFO):
    formatter = logging.Formatter(format, datefmt='%d-%m-%y %H:%M:%S')
    handler = logging.FileHandler(log_file)
    handler.setFormatter(formatter)
    logger = logging.getLogger(name)
    logger.setLevel(level)
    logger.addHandler(handler)
    return logger
