# Basic concepts

Before I start explaining to you how to use the library, we need to agree on certain terminology.

qolor

:	Qt Quick's `color`

color

: 	my `Color`

## Functions

### Acceptable value ranges

#### Normalized real inteval (`norm`)

Allmost all functions work with arguments that belong to normalized interval.
$$
n \in [0, 1]
$$

#### Real interval (`real`)
This one is mainly used to denote an offset/change of a normalized value.
$$
r \in [-1, 1]
$$

#### Integer interval (`8bit`)
$$
i \in [0, 255]
$$
