export default {
  postFile (req, res) {
    try {
      if ( !req.files || Object.keys(req.files).length === 0 ) {
      return res.status(400).json({ INFO: `No files were uploaded.`})
      } else {
        let files = [];
        const { data } = req.files;

        if (Array.isArray(data)) {
          data.map( (file) => {
            file.mv(`./server/uploads/${file.name}`)

            files.push({
              name: file.name,
              mimeType: file.mimeType,
              size: file.size
            })
          })
        } else {
          files.push({
            name: data.name,
            mimeType: data.mimeType,
            size: data.size
          })
        }
        (files.length > 1)
        ? res.status(201).json({ INFO: `Files uploaded`, DATA: files })
        : res.status(201).json({ INFO: `File uploaded`, DATA: files })
      }
    } catch (err) {
      res.status(500).json({ MESSAGE: `${err}` })
    }

  }
}