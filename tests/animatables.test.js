describe('Animatables', () => {
  test('Single element from CSS selector', () => {
    const animation = anime({
      targets: '#target-id',
      translateX: 100
    });

    const targetEl = document.querySelector('#target-id');
    expect(animation.animations.length).toBe(1);
    expect(animation.animatables[0].target).toBe(targetEl);
  });

  test('Multiple elements from CSS selector', () => {
    const animation = anime({
      targets: '.target-class',
      translateX: 100
    });

    const targetEls = document.querySelectorAll('.target-class');
    expect(animation.animations.length).toBe(4);
    targetEls.forEach((el, i) => {
      expect(animation.animatables[i].target).toBe(el);
    });
  });

  test('Single element from domNode', () => {
    const targetEl = document.querySelector('#target-id');
    const animation = anime({
      targets: targetEl,
      translateX: 100
    });

    expect(animation.animations.length).toBe(1);
    expect(animation.animatables[0].target).toBe(targetEl);
  });

  test('Multiple elements from nodeList', () => {
    const targetEls = document.querySelectorAll('.target-class');
    const animation = anime({
      targets: targetEls,
      translateX: 100
    });

    expect(animation.animations.length).toBe(4);
    targetEls.forEach((el, i) => {
      expect(animation.animatables[i].target).toBe(el);
    });
  });

  test('Single object from JS Object', () => {
    const animation = anime({
      targets: testObject,
      plainValue: 200
    });

    expect(animation.animations.length).toBe(1);
    expect(animation.animatables[0].target).toBe(testObject);
  });

  test('Multiple elements from an Array of mixed CSS selectors', () => {
    const animation = anime({
      targets: ['#target-id', '.target-class', 'div[data-index="0"]'],
      translateX: 100
    });

    const targetIdEl = document.querySelector('#target-id');
    const targetClassEls = document.querySelectorAll('.target-class');
    const targetDataEl = document.querySelector('div[data-index="0"]');
    expect(animation.animations.length).toBe(4);
    expect(animation.animatables[0].target).toBe(targetIdEl);
    expect(animation.animatables[0].target).toBe(targetDataEl);
    targetClassEls.forEach((el, i) => {
      expect(animation.animatables[i].target).toBe(el);
    });
  });

  test('Multiple elements and object from an Array of mixed target types', () => {
    const targetClassEls = document.querySelectorAll('.target-class');
    const animation = anime({
      targets: [testObject, '#target-id', targetClassEls, 'div[data-index="0"]'],
      translateX: 100
    });

    const targetIdEl = document.querySelector('#target-id');
    const targetDataEl = document.querySelector('div[data-index="0"]');
    expect(animation.animations.length).toBe(5);
    expect(animation.animatables[0].target).toBe(testObject);
    expect(animation.animatables[1].target).toBe(targetIdEl);
    expect(animation.animatables[1].target).toBe(targetDataEl);
    expect(animation.animatables.length).toBe(5);
  });

  test('Animations without targets', resolve => {
    const animation = anime({
      duration: 100,
      complete: () => {
        expect(animation.animatables.length).toBe(0);
        expect(animation.animations.length).toBe(0);
        expect(animation.duration).toBe(100);
        resolve();
      }
    });
  });

  test('Remove targets with Objects ref', () => {
    const animation = anime({
      targets: [testObject, anOtherTestObject],
      plainValue: 200,
    });
    expect(animation.animations.length).toBe(2);

    anime.remove(testObject);
    expect(animation.animations.length).toBe(1);

    anime.remove(anOtherTestObject);
    expect(animation.animations.length).toBe(0);
  });

  test('Remove targets from multiple instances at once', () => {
    const animation1 = anime({
      targets: [testObject, anOtherTestObject],
      plainValue: 200,
    });
    const animation2 = anime({
      targets: anOtherTestObject,
      plainValue: 300,
    });
    expect(animation1.animations.length).toBe(2);
    expect(animation2.animations.length).toBe(1);

    anime.remove(testObject);
    expect(animation1.animations.length).toBe(1);
    expect(animation2.animations.length).toBe(1);

    anime.remove(anOtherTestObject);
    expect(animation1.animations.length).toBe(0);
    expect(animation2.animations.length).toBe(0);
  });

  test('Remove targets on a specific instance', () => {
    const animation1 = anime({
      targets: [testObject, anOtherTestObject],
      plainValue: 200,
    });
    const animation2 = anime({
      targets: [anOtherTestObject, testObject],
      plainValue: 300,
    });
    expect(animation1.animations.length).toBe(2);
    expect(animation2.animations.length).toBe(2);

    animation1.remove(anOtherTestObject);
    expect(animation1.animations.length).toBe(1);
    expect(animation2.animations.length).toBe(2);

    animation2.remove(testObject);
    expect(animation1.animations.length).toBe(1);
    expect(animation2.animations.length).toBe(1);

    animation1.remove(testObject);
    expect(animation1.animations.length).toBe(0);
    expect(animation2.animations.length).toBe(1);

    animation2.remove(anOtherTestObject);
    expect(animation1.animations.length).toBe(0);
    expect(animation2.animations.length).toBe(0);
  });

  test('Remove targets with CSS selectors', () => {
    const animation = anime({
      targets: ['#target-id', '.target-class', 'div[data-index="0"]'],
      translateX: 100,
    });
    expect(animation.animations.length).toBe(4);

    anime.remove('#target-id');
    expect(animation.animations.length).toBe(3);

    anime.remove('[data-index="2"]');
    expect(animation.animations.length).toBe(2);

    anime.remove('.target-class');
    expect(animation.animations.length).toBe(0);
  });

  test('Do not pause instances with no targets when calling remove', resolve => {
    const animationWithoutTargets = anime({
      duration: 100,
      complete: () => {
        resolve();
      }
    });

    const animation = anime({
      targets: '#target-id',
      translateX: 100,
    });
    expect(animation.animations.length).toBe(1);

    anime.remove('#target-id');
    expect(animation.animations.length).toBe(0);
  });
});