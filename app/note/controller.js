const fs = require('fs');
const path = require('path');

const Note = require('./model');
const Tag = require('../tag/model');
const config = require('../config');

async function index(req, res, next) {
    try {
        let { limit = 10, skip = 0, q = '', tags = [] } = req.query;

        let criteria = {};

        if (q.length) {
            criteria = {
                ...criteria,
                title: { $regex: q, $options: 'i' }
            }
        }

        if (tags.length) {
            tags = Array.isArray(tags) ? tags : tags.split();

            var optValues = tags;
            var optRegexp = [];
            optValues.forEach(function (opt) {
                optRegexp.push(new RegExp(opt, 'i'));
            });

            tags = await Tag.find({ name: { $in: optRegexp } });

            criteria = { ...criteria, tags: { $in: tags.map(tag => tag._id) } }
        }

        let notes = await Note
            .find(criteria)
            .limit(parseInt(limit))
            .skip(parseInt(skip))
            .populate('tags');

        return res.json({
            success: true,
            message: 'GET Notes',
            notes
        });
    } catch (error) {
        next(error);
    }
}

async function store(req, res, next) {
    try {
        let payload = req.body;

        if (payload.tags && payload.tags.length) {
            payload.tags = Array.isArray(payload.tags) ? payload.tags : payload.tags.split();

            var optValues = payload.tags;
            var optRegexp = [];
            optValues.forEach(function (opt) {
                optRegexp.push(new RegExp(opt, 'i'));
            });

            let tags = await Tag.find({ name: { $in: optRegexp } });

            if (tags.length) {
                payload = { ...payload, tags: tags.map(tag => tag._id) }
            }
        }

        if (req.file) {
            let tmp_path = req.file.path;
            let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
            let filename = req.file.filename + '.' + originalExt;
            let target_path = path.resolve(config.rootPath, `public/upload/${filename}`);

            const src = fs.createReadStream(tmp_path);
            const dest = fs.createWriteStream(target_path);
            src.pipe(dest);

            src.on('end', async () => {
                try {
                    let note = new Note({
                        ...payload,
                        image_url: filename
                    })
                    await note.save()

                    return res.json({
                        success: true,
                        message: 'Note has been created.',
                        note
                    });
                } catch (error) {
                    fs.unlinkSync(target_path);

                    if (error & error.name === 'ValidationError') {
                        return res.json({
                            success: false,
                            message: error.message,
                            fields: error.errors
                        });
                    }

                    next(error);
                }
            });

            src.on('error', async () => {
                next(error);
            });

        } else {
            let note = new Note(payload);

            await note.save();
            return res.json({
                success: true,
                message: 'Note has been created.',
                note
            });
        }


    } catch (error) {
        if (error && error.name === 'ValidationError') {
            return res.json({
                success: false,
                message: error.message,
                fields: error.errors
            });
        }

        next(error);
    }
}

async function update(req, res, next) {
    try {
        let payload = req.body;

        if (payload.tags && payload.tags.length) {

            let tags = await Tag.find({ name: { $in: payload.tags } });

            if (tags.length) {
                payload = { ...payload, tags: tags.map(tag => tag._id) }
            }
        }

        if (req.file) {
            let tmp_path = req.file.path;
            let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
            let filename = req.file.filename + '.' + originalExt;
            let target_path = path.resolve(config.rootPath, `public/upload/${filename}`);

            const src = fs.createReadStream(tmp_path);
            const dest = fs.createWriteStream(target_path);
            src.pipe(dest);

            src.on('end', async () => {
                try {
                    let note = await Note.findOne({ _id: req.params.id });
                    let currentImage = `${config.rootPath}/public/upload/${note.image_url}`;

                    if (fs.existsSync(currentImage)) {
                        fs.unlinkSync(currentImage)
                    }

                    note = await Note.findOneAndUpdate({
                        _id: req.params.id
                    }, { ...payload, image_url: filename }, { new: true, runValidators: true });

                    return res.json({
                        success: true,
                        message: 'Note has been updated!',
                        note
                    });
                } catch (error) {
                    if (error && error.name === 'ValidationError') {
                        return res.json({
                            success: false,
                            message: error.message,
                            fields: error.errors
                        });
                    }

                    next(error);
                }
            });

            src.on('error', async () => {
                next(error);
            });
        } else {
            let note = await Note.findOneAndUpdate({ _id: req.params.id }, payload, { new: true, runValidators: true });

            return res.json({
                success: true,
                message: 'Note has been updated!',
                note
            });
        }
    } catch (error) {
        if (error && error.name === 'ValidationError') {
            return res.json({
                success: false,
                message: error.message,
                fields: error.errors
            });
        }

        next(error);
    }
}

async function destroy(req, res, next) {
    try {
        let note = await Note.findOneAndDelete({ _id: req.params.id });
        let currentImage = `${config.rootPath}/public/upload/${note.image_url}`;

        if (fs.existsSync(currentImage)) {
            fs.unlinkSync(currentImage)
        }

        return res.json({
            success: true,
            message: 'Note has been deleted!',
            note
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    index,
    store,
    update,
    destroy
}