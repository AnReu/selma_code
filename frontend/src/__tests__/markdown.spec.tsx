/* eslint-disable no-useless-escape */
import { addDelimiters } from '../features/Markdown';

describe('addDelimiters', () => {
  it('replaces span-tags with $', () => {
    const str1 = '<p>Integration. <span class="math-container" id="1979">\int 4\pi\cdot r^2 dr = 4/3 \pi r^3.</span></p>';
    const str2 = '<p><a href="http://mathfactor.uark.edu/">mathfactor</a> is one I listen to.  Does anyone else have a recommendation?</p>';
    const str3 = '<p>Assuming you know the definition of orthogonal as "a is orthogonal to b iff <span class="math-container" id="759">a\cdot b=0</span> then we could calculate <span class="math-container" id="760">(a \times b)\cdot a = a_1(a_2b_3-a_3b_2)-a_2(a_1b_3-a_3b_1)-a_3(a_1b_2-a_2b_1)=0</span> and  <span class="math-container" id="761">(a \times b)\cdot b-0</span>, so the cross product is orthogonal to both. As Nold mentioned, if the two vectors a and b lie in the x,y plane, then the orthogonal vectors must be purely in the z direction.</p>';
    const newStr1 = addDelimiters(str1);
    const newStr2 = addDelimiters(str2);
    const newStr3 = addDelimiters(str3);
    expect(newStr1).toBe('<p>Integration. $\int 4\pi\cdot r^2 dr = 4/3 \pi r^3.$</p>');
    expect(newStr2).toBe('<p><a href="http://mathfactor.uark.edu/">mathfactor</a> is one I listen to.  Does anyone else have a recommendation?</p>');
    expect(newStr3).toBe('<p>Assuming you know the definition of orthogonal as "a is orthogonal to b iff $a\cdot b=0$ then we could calculate $(a \times b)\cdot a = a_1(a_2b_3-a_3b_2)-a_2(a_1b_3-a_3b_1)-a_3(a_1b_2-a_2b_1)=0$ and  $(a \times b)\cdot b-0$, so the cross product is orthogonal to both. As Nold mentioned, if the two vectors a and b lie in the x,y plane, then the orthogonal vectors must be purely in the z direction.</p>');
  });
});
