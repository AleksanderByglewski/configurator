import os

def display_tree(start_path, depth, max_depth=2, prefix=''):
    if depth > max_depth:
        return
    
    for entry in sorted(os.listdir(start_path)):
        if entry == 'node_modules' or entry =='.git':  # Skip node_modules folder
            continue
        
        path = os.path.join(start_path, entry)
        
        if os.path.isdir(path):
            print(f"{prefix}|- {entry}/")
            display_tree(path, depth + 1, max_depth, prefix + "|  ")
        else:
            print(f"{prefix}|- {entry}")

folder_path = '.'  # current directory
display_tree(folder_path, 0)
