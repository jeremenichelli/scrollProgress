(function(root) {
    'use strict';

    describe('scrollProgress', function() {
        it('namespace available in global scope', function() {
            expect(typeof root.scrollProgress).toBe('object');
        });
        it('set method available in global scope', function() {
            expect(typeof root.scrollProgress.set).toBe('function');
        });
        it('namespace available in global scope', function() {
            expect(typeof root.scrollProgress.trigger).toBe('function');
        });
        it('namespace available in global scope', function() {
            expect(typeof root.scrollProgress.update).toBe('function');
        });
    });
})(this);