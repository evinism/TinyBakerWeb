import connexion
import six

from swagger_server.models.file_record import FileRecord  # noqa: E501
from swagger_server.models.job import Job  # noqa: E501
from swagger_server import util


def create_file(name, file):  # noqa: E501
    """Stores a file in TinyBakerWeb&#x27;s local filestore
     # noqa: E501

    :param name: 
    :type name: str
    :param file: 
    :type file: strstr

    :rtype: FileRecord
    """
    return 'do some magic!'


def delete_file(file_id):  # noqa: E501
    """Delete File

     # noqa: E501

    :param file_id: ID of the file that needs to be deleted
    :type file_id: int

    :rtype: None
    """
    return 'do some magic!'


def get_file_by_id(file_id):  # noqa: E501
    """Get file by ID

     # noqa: E501

    :param file_id: ID of file that needs to be fetched
    :type file_id: int

    :rtype: Job
    """
    return 'do some magic!'


def get_files():  # noqa: E501
    """Get files

     # noqa: E501

    :rtype: FileRecord[]
    """
    return 'do some magic!'
