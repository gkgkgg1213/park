function capturePhoto(){
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, {quality: 50, destinationType: Camera.destinationType.FILE_URI});
}

function onPhotoDataSuccess(imageURI){
	$('#imgArea').attr('src', imageURI);
	movePic(imageURI);
}

function onFail(message){
	alert('Failed because: ' + message);
}

function movePic(fileuri){
	window.resolveLocalFileSystemURL(fileuri,resolveOnSuccess,OnError);
}

function resolveOnSuccess(fileentry){
	if(flag == 'enrol'){
		var newfilename=$('#cafePic1').val()+'.jpg';
	}else if(flag == 'modify') {
		var newfilename=$('#cafePic2').val()+'.jpg';
	}


	var newfoldername = "matzipApp";

	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
		function(filesysobj){
		filesysobj.root.getDirectory(newfoldername, {create:true, exclusive: false},
		function(directoryentry){
			fileentry.moveTo(directoryentry, newfilename, successMove, OnError);
		}, OnError);
	},OnError);
}


function successMove(fileentry){
	console.log(fileentry.fullPath);
	if(flag=='enrol'){
		$('#cafePic1').val(fileentry.toURL());
	}else if(flag=='modify'){
		$('#cafePic2').val(fileentry.toURL());
	}
}

function OnError(error){
	alert(error.code);
}