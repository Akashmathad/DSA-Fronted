const hello = JSON.stringify(`public static void remove(int[] arr){
  for(int i = 0; i < arr.length; i++){
      int check = arr[i];
      for(int j = 0; j < arr.length; j++){
          if(check == arr[j] && i != j){
              for(int k = j; k < arr.length - 1; k++){
                  arr[k] = arr[k + 1];
              }
          }
      }

  }
  System.out.println(Arrays.toString(arr));`);
console.log();
console.log(hello);
console.log();
console.log(JSON.parse(hello));
