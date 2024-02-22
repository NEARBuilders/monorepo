return {
    intersect: (firstObject, secondObject) => {
        return Object.fromEntries(
            new Map(
                Object.keys(firstObject).map((key) => [key, secondObject[key] || firstObject[key]])
            )
        );
    },
    clean: (obj) => {
        return Object.fromEntries(
            Object.entries(obj).filter(([_, v]) => v)
        )
    }
};