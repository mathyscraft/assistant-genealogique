# import eel
# import json

# eel.init('web')

# @eel.expose
# def get_data():
#     with open('web/data/data.json') as file:
#         data = json.load(file)
#         return json.dumps(data)
    
# @eel.expose
# def update_data(data):
#     with open('web/data/data.json') as file:
#         json.dump(data, file)

# eel.start('addNewCard.html')
