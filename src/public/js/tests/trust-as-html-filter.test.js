describe('trust as html filter', function() {

    var $filter;

    beforeEach(module('searchApp'));

    beforeEach(inject(function(_$filter_){
        $filter = _$filter_;
    }));

    it('return correct html', function() {
        var html = '<div><script type="javascript">alert("1")</script></div>';
        var trustAsHtml = $filter('trustAsHtml');
        expect(trustAsHtml(html).toString()).toEqual(html);
    });
});