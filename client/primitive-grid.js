isc.Menu.create({
	ID: "contextMenu",
	width: 150,
	data: [{
		title: "add",
		click: function() {
			formWindow.show();
		}
	}, {
		title: "update",
		enableIf: function() {
			return userList.getSelectedRecord() != null;
		},
		click: function() {
			updateForm.setData();
			updateWindow.show();
		}
	}, {
		title: "delete",
		enableIf: function() {
			return userList.getSelectedRecord() != null;
		},
		click: function() {
			confirmDelete.show();
		}
	}]
})

isc.ListGrid.create({
	ID: "userList",
	width: 500, height: 400,
	fields: user,
	refresh: function() {
		var me = this;
		getUsers(function(rpcResponce, data, rpcRequest) {
			me.setData(data);
		});
	},
	initWidget: function() {
		this.Super("initWidget", arguments);
		this.refresh();
	},
	canEdit: true,
	editEvent: "doubleClick",
	editComplete: function(rowNum, colNum, newValues, oldValues, editCompletionEvent) {
		var me = this;
		var record = me.getEditedRecord(rowNum);
		var user = filterProperty(me.fields, record);
		updateUser(user);
		me.refresh();
	},
	selectionChanged: function(record, state) {
		deleteButton.setEnabled(state);
		updateButton.setEnabled(state);
	},
	delete: function() {
		var me = this;
		var record = me.getSelectedRecord();
		deleteUser(record.userId);
		me.refresh();
	},
	contextMenu: contextMenu
})