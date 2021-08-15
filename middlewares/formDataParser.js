import multiparty from 'multiparty';

const allowedExtensions = ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp', 'image/tiff'];

const checkExtension = (extension) => {
    if (allowedExtensions.includes(extension.toLowerCase())) {
      return true;
    }
    return false;
  };

const formDataParser = async (req, res, next) => {
    const form = new multiparty.Form({maxFieldsSize: '50MB'});
    form.parse(req, (error, fields, files) => {
        if(error) {
            console.log(error);
            return res.status(422).json({
                status: 422,
                error: 'unable to parse form-data'
            });
        }
        Object.keys(fields).forEach(el => {
            req.body[el] = fields[el][0];
        });
        if(files.profilePhoto){
            if(files.profilePhoto.length > 1){
                return res.status(422).json({
                    status: 422,
                    error: 'Cannot send more than one picture.'
                });
            } else if(files.profilePhoto.length === 1 && files.profilePhoto[0].headers['content-type'] && files.profilePhoto[0].size !== 0) {
                if(checkExtension(files.profilePhoto[0].headers['content-type'])) {
                    req.files = files;
                    return next();
                } else {
                    return res.status(422).json({
                        status: 422,
                        error: 'Image file not supported.'
                    });
                }
            }
        }
        return next();
    });
};

export { formDataParser };
