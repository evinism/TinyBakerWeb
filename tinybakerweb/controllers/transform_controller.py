import connexion
import six

from swagger_server.models.transform import Transform  # noqa: E501
from swagger_server import util
from ..datastore import datastore

from tinybaker.workarounds.annot import is_fileset


def project_tag_for_api(name):
    if is_fileset(name):
        tag_type = "file"
    else:
        tag_type = "fileset"

    return {
        "name": name,
        "type": tag_type
    }


def project_transform_for_api(index, transform):
    return {
        "id": index,
        "name": transform.name,
        "inputTags": [project_tag_for_api(tag) for tag in transform.input_tags],
        "outputTags": [project_tag_for_api(tag) for tag in transform.output_tags],
        "structure": transform.structure(),
    }


def get_transform_by_id(transform_id):  # noqa: E501
    """Find transform by ID

    Returns a single transform # noqa: E501

    :param transform_id: ID of transform to return
    :type transform_id: int

    :rtype: Transform
    """
    if transform_id > len(datastore.transforms): 
        raise Exception("Invalid Transform ID")
    return project_transform_for_api(transform_id, datastore.transforms[transform_id])

    


def get_transforms(status=None):  # noqa: E501
    """Gets list of available transforms

    Multiple status values can be provided with comma separated strings # noqa: E501

    :param status: Status values that need to be considered for filter
    :type status: List[str]

    :rtype: List[Transform]
    """
    return [project_transform_for_api(idx, datastore.transforms[idx]) for idx in range(len(datastore.transforms))]
