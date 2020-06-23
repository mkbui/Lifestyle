import React from 'react'

async requestExternalWritePermission() {
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
ExportHTMLToPDF = () => {

}

createHTML = () => {

}
GetData = () => {

}

async createPDF() {
    //GetData();
    //createHTML();
    //ExportHTMLToPDF();
    let options = {
      //Content to print
      html:
        '<h1 style="text-align: center;"><strong>Hello Guys</strong></h1><p style="text-align: center;">Here is an example of pdf Print in React Native</p><p style="text-align: center;"><strong>Team About React</strong></p>',
      //File Name
      fileName: 'test',
      //File directory
      directory: 'docs',
    };
    let file = await RNHTMLtoPDF.convert(options);
    console.log(file.filePath);
    this.setState({filePath:file.filePath});
  }

