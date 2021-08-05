const Tag = require('./model');

async function index(req, res, next) {
    try {
        let { limit = 10, skip = 0, q = '' } = req.query;

        let criteria = {};

        if (q.length) {
            criteria = {
                ...criteria,
                name: { $regex: q, $options: 'i' }
            }
        }

        let tags = await Tag
            .find(criteria)
            .limit(parseInt(limit))
            .skip(parseInt(skip))

        return res.json({
            success: true,
            message: 'GET Tags',
            tags
        });
    } catch (error) {
        next(error);
    }
}

async function store(req, res, next) {
    try {
        let payload = req.body;
        let tag = new Tag(payload);

        await tag.save();

        return res.json({
            success: true,
            message: 'Tags has been created!',
            tag
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
}

async function update(req, res, next) {
    try {
        let payload = req.body;

        let tag = await Tag.findOneAndUpdate({ _id: req.params.id }, payload, { new: true, runValidators: true });

        return res.json({
            success: true,
            message: 'Tags has been updated!',
            tag
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
}

async function destroy(req, res, next) {
    try {
        let tag = await Tag.findOneAndDelete({ _id: req.params.id });

        return res.json({
            success: true,
            message: 'Tags has been deleted!',
            tag
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