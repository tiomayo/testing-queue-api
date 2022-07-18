const QueueLog = require('../models/queue.model');
const helper = require('../utils/helper.util');

async function get(param) {
    let service = 'general';
    if (param.service && ['general', 'emergency'].includes(param.service)) {
        service = param.service;
    }
    const rows = await QueueLog.findOneAndUpdate({ service: service, date: new Date().toISOString().slice(0, 10) }, { $inc: { seq: 1 } }, { new: true, upsert: true }).then(count => {
        if (count.seq > 999) {
            count.seq = 1;
            return count.save();
        }
        return count;
    });
    
    return {
        antrian: helper.getNomorAntrian(rows.seq, service),
        tanggal: rows.updatedAt
    }
}

module.exports = {
    get
}