import pycps

class CPDatabase(object):
# Create a connection to a Clusterpoint database.
	def __init__(self):
	
		DB_NAME = 'apollo'
		CLIENT_EMAIL = 'jordanlittell@gmail.com'
		CLIENT_PASSWORD = 'upxf3250lsr'
		ACCOUNT_ID = '100908'

		self.con = pycps.Connection('tcp://cloud-us-0.clusterpoint.com:9007', DB_NAME, CLIENT_EMAIL, CLIENT_PASSWORD, ACCOUNT_ID)

	def insert_mixed(self, docs_mixed): 
		#docs_mixed = {1: {'text': 'Lorem ipsum.', 'textxxx': 'Lorem ipsum.', 'title': 'Title!'}, 2: '<document/>'}
		try:
			self.con.insert(docs_mixed)
		except pycps.APIError as e:
			print(e)

	def insert(self, obj):
		print("inserting...")
		try:
			self.con.insert(obj)
		except pycps.APIError as e:
			print(e)

	def retrieve(self, id):
		try:
		    response = self.con.retrieve(id)
		    print(id)
		    print response
		    return response
		except pycps.APIError as e:
		    print(e)
		    if e.code == 2824:
		        print("Requested non-existing id(s): {0}".format(', '.join(e.document_id)))
