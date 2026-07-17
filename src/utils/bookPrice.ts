export function getBookPrice(id: string): number {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0
  }
  
  const steps = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70]
  return steps[hash % steps.length]
}
 

// Bu funksiya kitabın id- sinə əsasən sabit  qiymət yaradır 
// yəni real api - dən qiymət gəlmir ama bizə satış üçün qiymət lazımdır,
//  hər kitab id - si üçün həmişə eyni qiyməti hesablayan - bir üsuldur