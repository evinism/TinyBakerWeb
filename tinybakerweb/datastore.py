# Not happy that this pretty much has to be a singleton

# Should probs be converted to use some type of db.
class DataStore():
  def __init__(self):
    self.tranforms = []

datastore = DataStore()
