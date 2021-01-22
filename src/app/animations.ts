import {
  trigger, animateChild, group,
  transition, animate, style, query
} from '@angular/animations';


/**
 * Implement slide in animation for changes in route
 * between NewsComponent => NewsDetailComponent
 * and NewsDetailComponent => NewsComponent
 * as per the provided video
 */

export const QUERY_OPTIONAL = { optional: true };


export const ANIM_TO_SIDE = (direction: string = "right") => {
  return [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        [direction]: 0,
        width: '100%'
      })
    ]),
    query(':enter', [
      style({ [direction]: '-200%' })
    ]),
    query(':leave', animateChild()),

    group([
      query(':leave', [
        animate('0.35s ease-out', style({
          [direction]: '-200%',
        }))
      ]),
      query(':enter', [
        animate('0.7s ease-in', style({
          [direction]: 0,
        }))
      ])
    ],
    ),
    query(':enter', animateChild())



  ]
}


export const slideInAnimation = trigger('routeAnimations', [
  transition('NewsComponent => NewsDetailComponent', ANIM_TO_SIDE('right')),
  transition('NewsDetailComponent=>NewsComponent', ANIM_TO_SIDE('left'))
]);
