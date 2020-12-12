import connexion
import six

from swagger_server.models.job import Job  # noqa: E501
from swagger_server import util


def delete_job(job_id):  # noqa: E501
    """Delete Job

     # noqa: E501

    :param job_id: ID of the job that needs to be deleted
    :type job_id: int

    :rtype: None
    """
    return 'do some magic!'


def get_job_by_id(job_id):  # noqa: E501
    """Get job by ID

     # noqa: E501

    :param job_id: ID of job that needs to be fetched
    :type job_id: int

    :rtype: Job
    """
    return 'do some magic!'


def get_jobs():  # noqa: E501
    """Returns all running TinyBaker jobs

    Returns all running TinyBaker jobs # noqa: E501


    :rtype: List[Job]
    """
    return 'do some magic!'


def trigger_tiny_baker_run(transform_id, additional_metadata, file):  # noqa: E501
    """Triggers a TinyBaker transform to run

     # noqa: E501

    :param transform_id: 
    :type transform_id: int
    :param additional_metadata: 
    :type additional_metadata: str
    :param file: 
    :type file: strstr

    :rtype: Job
    """
    return 'do some magic!'
