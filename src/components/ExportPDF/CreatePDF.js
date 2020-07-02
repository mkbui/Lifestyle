import React from 'react'

requestExternalWritePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Lifestyle App External Storage Write Permission',
          message:
            'Export Personal Document needs access to Storage data',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.createPDF();
      } 
      else {
        alert('WRITE_EXTERNAL_STORAGE permission denied');
      }
    } catch (err) {
      alert('Write permission err', err);
      console.warn(err);
    }
}

createPDF = async () => {
  
  }

