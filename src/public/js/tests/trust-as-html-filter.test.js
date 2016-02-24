describe('trust as html filter', function() {

    var $filter;

    beforeEach(module('searchApp'));

    beforeEach(inject(function(_$filter_){
        $filter = _$filter_;
    }));

    it('return correct html', function() {
        var html = '<div>aaaa</div>';
        var trustAsHtml = $filter('trustAsHtml');
        expect(trustAsHtml(html)).toEqual(html);
    });
});