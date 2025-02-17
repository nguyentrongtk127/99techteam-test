function sum_to_n_a(n: number): number {
    // a loop to calculate the sum from 1 to n
    // Time Complexity: O(n) 
    // Space Complexity: O(1)
    // Efficiency: With large integers, the function becomes slow.
    let sum = 0;
    for(let i = 1; i < n + 1; i++) {
        sum += i
    }
    return sum
}

function sum_to_n_b(n: number): number {
    // the math formulas
    // Time Complexity: O(1) 
    // Space Complexity: O(1)
    // Efficiency: Very fast, very good
    return (n * (n + 1)) / 2;
}

function sum_to_n_c(n: number): number {
    // the recursive function to calculate the sum from 1 to n
    // Time Complexity: O(n)
    // Space Complexity: O(n)
    // Efficiency: With large integers, the function becomes slow and may cause a Stack Overflow.
    if (n <= 0) return 0;
    return n + sum_to_n_c(n - 1);
}

console.log("a loop to calculate the sum from 1 to n: \n",sum_to_n_a(5)); // Expected output: 15
console.log("the math formulas: \n",sum_to_n_b(5)); // Expected output: 15
console.log("the recursive function to calculate the sum from 1 to n: \n", sum_to_n_c(5)); // Expected output: 15