import pandas as pd
import time

def calcular_precios_finales(df):
    precios_finales = []
    
    descuentos = {
        'Electrónica': 0.10,  
        'Ropa': 0.20,         
        'Hogar': 0.15,        
        'Alimentos': 0.05,    
        'Juguetes': 0.25      
    }
    
    IMPUESTO = 0.19
    
    for indice, fila in df.iterrows():
        categoria = fila['categoria']
        cantidad = fila['cantidad']
        precio_unitario = fila['precio_unitario']
        
        subtotal = cantidad * precio_unitario
        
        descuento_categoria = descuentos.get(categoria, 0)
        precio_con_descuento = subtotal * (1 - descuento_categoria)
        
        precio_final = precio_con_descuento * (1 + IMPUESTO)
        
        precios_finales.append(precio_final)
        
    df['precio_final'] = precios_finales
    return df

# --- Script principal ---
if __name__ == "__main__":
    print("Iniciando procesamiento datos...")
    
    inicio = time.time()
    
    df = pd.read_csv('data-python/ventas.csv')
    
    df_resultado = calcular_precios_finales(df)
    
    fin = time.time()
    
    print(f"Tiempo total de ejecución: {fin - inicio:.4f} segundos.")
    print("\nPrimeros 5 registros procesados:")
    print(df_resultado.head())