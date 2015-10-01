module.exports = {
    escape: function (html) {
        return String(html)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    },

    delete:function(html){
        return String(html)
            .replace(/&/g, '')
            .replace(/"/g, '')
            .replace(/'/g, '')
            .replace(/</g, '')
            .replace(/>/g, '');
    }
}