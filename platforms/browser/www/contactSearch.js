var contactList;

function serchContact() {
	var searchStr = $('#searchKey').val();

	var contactFields = ['displayName', 'name', 'phoneNumbers', 'emails', 'addresses' ];

	var contactFindOptions = { filter : searchStr, multiple : ture };

	navigator.contacts.find(contactFields, onContactSearchSuccess, onContactSearchError, contactFindOptions);
}

function searchContactAll(){
	var contactFields = ['displayName', 'name', 'phoneNumbers', 'emails', 'addresses' ];

	var contactFindOptions = { filter : '', multiple : ture };

	navigator.contacts.find(contactFields, onContactSearchSuccess, onContactSearchError, contactFindOptions);

}

function onContactSearchSuccess(contacts){
	var i, len, tagList = '';
	contactList = contacts;
	len = contacts.length;
	if(len > 0){
		tagList = '<ul data-role="Listview" id="clistview" data-inset="true" data-autodividers="true">';
		for(i=0, len; i<len; i+=1){
			tagList += '<li<a onclick=displayContact('+i+');">' + contacts[i].displayName + '</a></li';

		}
		tagList += '</ul>';
		$('#contactListArea').children().last().replaceWith(tagList);
		$(document).bind('pagechange', function(){
			$('.ui-page-active :jqmData(role=content)')trigger('create');
		});
		$.mobile.changePage('#contactListShowPage', 'slide', false, true);
	} else {
		navigator.notification.alert('검색결과 없음', null, '연락처 검색 성공');
	}
}

function onContactSearchError(e){
	navigator.notification.alert(e.code, null, "연락처 검색 오류");
}