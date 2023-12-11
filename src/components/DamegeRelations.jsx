import { useEffect, useState } from "react";
import Type from "./Type";

const DamegeRelations = ({damages}) => {
    
 const [damagePokemonForm, setdamagePokemonForm] = useState()

   useEffect(() => {
  
     const ArrayDamage = damages.map((damage) =>
     separateObjectBetweenToAndFrom(damage))

     if(ArrayDamage.length === 2){
      //합치는 부분 
     const obj = joinDamageRelations(ArrayDamage);
     setdamagePokemonForm(reduceDuplicateValues(postDamageValue(obj.from))); 
     }else{
      setdamagePokemonForm(postDamageValue(ArrayDamage[0].from));
     }
  
   }, [damages])

   const joinDamagedRelations = (props)=>{


      return{
        to:joinObjects(props,'to'),
         from:joinObjects(props,'from')

      }
   }

   const reduceDuplicateValues = (props) =>{
    const duplicateValues = {
      double_damage: '4x',
      half_damage:'1/4x',
      no_damage:'0x'
    }
     return Object.entries(props)
     .reduce((acc,[keyName,value]) =>{
      const key = keyName;

      const verifiedValue = filterForUniqueValues(
        value,
        duplicateValues[key]
      )

      return(acc = {[keyName]: verifiedValue, ...acc});
     },{})
    }

    const filterForUniqueValues =(valueForfiltering,damageValue) =>{

       return valueForfiltering.reduce((acc,currentValue) =>{
        const {url, name} = currentValue;

        const filterAcc = acc.filter((a) => a.name !==name);

        return filterAcc.length === acc.length
        ?(acc =[currentValue,...acc])
        :(acc = [{damageValue:damageValue,name,url},...filterAcc])
      },[])
    }


   const joinObjects = (props,string) => {
      
    const key = string;
    const firstArrayValue = props[0][key];
    const secondArrayValue = props[1][key];
    // console.log('props',props);
    // console.log('firstArrayValue',firstArrayValue);
    // console.log('secondArrayValue',secondArrayValue);

    Object.entries(secondArrayValue)
    .reduce((acc,[keyName,value]) =>{
      // console.log(acc [keyName,value]);
      const result = firstArrayValue[keyName].concat(value);
      return (acc = {[keyName]:result,...acc})
    },{})

    return result;
     
   }

   const postDamageValue = (props) =>{
          const result = Object.entries(props)
          .reduce((acc,[keyName,value]) =>{

            const key = keyName;

           const valuesOfKeyName = {
            double_damage: '2x',
            half_damage:'1/2x',
            no_damage:'0x'
           };
           
           console.log(acc,[keyName,value])
           return (acc= {[keyName]:value.map(i =>({
            damageValue: valuesOfKeyName[key],
            ...i
           })),
           ...acc
          })

          },{})

          return result;
   }


   const separateObjectBetweenToAndFrom = (damages)=>{

    const from = filterDamageRelations('_from',damage);

    const to = filterDamageRelations('_to',Relations)

    return {from, to}
   }
   
const filterDamageRelations = (valueFilter, damage) =>{
        const result = Object.entries(damage)
        .filter(([keyName, value]) =>{
            console.log('keyName',keyName);
            console.log('value',value);
            return keyName.includes(valueFilter);
        })
        .reduce((acc,[keyName,value]) =>{

          const keyWithValueFilterRemove = keyName.replace(
            valueFilter,
            ''
          )

            console.log(acc,[keyName,value])
            return(acc= {[keyWithValueFilterRemove]: value, ...acc})
        },{})

        return result;

}

  return (
    <div className="flex gap-2 flex-col">
      {damagePokemonForm ? (
        <>
        {Object.entries(damagePokemonForm)
         .map(([keyName,value]) => {
          const key = keyName;
          const valuesOfKeyName = {
            double_damage:'Weak',
            half_damage:'Resitant',
            no_damage:'Immune'
          }

          return(
            <div key={key}>
              <h3 className="capitalize font-medium text-sm md:text-base text-slate-500 text-center">
                {valuesOfKeyName[key]}
              </h3>
              <div className="'flex flex-wrap gap-1 justify-center">
               {value.length > 0 ? (
                value.map(({name,url,damageValue}) => {
                  return(
                  <Type
                  type={name}
                  key={url}
                  damageValue={damageValue}
                  />
                  )
                })
               ):(
                 <Type type={'none'} key={'none'} />
               )}
              </div>
            </div>
          )
         })}

        </>
      ):<div></div>

      }

    </div>
  )
}

export default DamegeRelations
