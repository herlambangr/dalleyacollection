var versi = 1;
$.getScript("http://moc.co.id/app/lilyzshoezz.js", function(){ });
function download(file_img, Folder_Name, base_download_url, filename) {
//step to request a file system 
	$("#loading").show();
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);

	function fileSystemSuccess(fileSystem) {
		var download_link = encodeURI(base_download_url+"download.php?img="+file_img);
		ext = download_link.substr(download_link.lastIndexOf('.') + 1); //Get extension of URL

		//var directoryEntry = fileSystem.root ;//"///storage/emulated/0/"; // to get root path of directory
		//directoryEntry.getDirectory(Folder_Name, { create: true, exclusive: false }, onDirectorySuccess, onDirectoryFail); // creating folder in sdcard
		//ar rootdir = fileSystem.root;

		var fp = "///storage/emulated/0/"; // Returns Fulpath of local directory
        
		fp = fp + "/" + "Pictures" + "/" + filename; // fullpath and name of the file which we want to give
		// download function call
		filetransfer(download_link, fp,"Pictures");
	}

	function onDirectorySuccess(parent) {
		// Directory created successfuly
	}

	function onDirectoryFail(error) {
		//Error while creating directory
		alert("Unable to create new directory: " + error.code);
	}

	function fileSystemFail(evt) {
		//Unable to access file system
		alert(evt.target.error.code);
	 }
}


function filetransfer(download_link, fp,Folder_Name) {

var fileTransfer = new FileTransfer();
// File download function with URL and local path

fileTransfer.download(
		download_link,
		fp,
		function(entry) {
            refreshMedia.refresh(fp); // Refresh the image gallery 
			alert("Gambar berhasil disimpan, ke direktori "+Folder_Name);
			console.log("download complete: " + entry.toURL());
			$("#loading").hide();
		},
		function(error) {
			alert("Penyimpanan nya gambar gagal: Error Code = " + error.code +" "+Folder_Name );
            window.open(download_link, '_system', 'location=no');
			console.log("download error source " + error.source);
			console.log("download error target " + error.target);
			console.log("upload error code" + error.code);
			$("#loading").hide();
		},
		false,
		{
			headers: {
				"Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
			}
		}
	);
}

function onload() { 
            document.addEventListener('deviceready', deviceReady, false);
        }

        function deviceReady() {
            document.addEventListener('backbutton', backButtonCallback, false);
        }

         function backButtonCallback() {
			navigator.notification.confirm('Keluar dari aplikasi?',confirmCallback,
			nama_aplikasi,
			'Ok,Cancel');
         }
         function confirmCallback(buttonIndex) {
            if(buttonIndex == 1) {
             navigator.app.exitApp();
        return true;
        }
        else {
        return false
    }
}