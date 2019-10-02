import { JsonPatchPipe } from './json-patch.pipe';

describe('JsonPatchPipe', () => {
  it('should be defined', () => {
    expect(new JsonPatchPipe()).toBeDefined();
  });

  it('should be invalid with invalid patch value', () => {
    const patches = [
      { wrong: 'replace', path: '/user/firstName', value: 'Albert' },
    ];

    expect(() =>
      new JsonPatchPipe().transform(patches),
    ).toThrowErrorMatchingSnapshot();
  });

  it('should be valid with valid patche value', () => {
    const patches = [
      { op: 'replace', path: '/user/firstName', value: 'Albert' },
    ];

    expect(new JsonPatchPipe().transform(patches)).toEqual(patches);
  });
});
